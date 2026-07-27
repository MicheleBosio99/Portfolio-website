import React from 'react';
import type { ContributionCalendar } from '../hooks/useGithubActivity';
import './ContributionHeatmap.css';

interface Props {
  calendar: ContributionCalendar;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Buckets a day's contribution count into one of five intensity levels. */
function levelFor(count: number, max: number): number {
  if (count <= 0) return 0;
  if (max <= 4) return Math.min(4, count);
  // Quartiles of the busiest day, so the scale adapts to how active the year was.
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
}

const ContributionHeatmap: React.FC<Props> = ({ calendar }) => {
  const max = calendar.weeks.reduce(
    (acc, week) => week.days.reduce((inner, day) => Math.max(inner, day.count), acc),
    0
  );

  /*
    Month labels sit above the column where that month first appears. Only
    labelled when there is room (a month spanning <2 weeks is skipped) so the
    labels never collide with each other.
  */
  const monthLabels: Array<{ index: number; label: string }> = [];
  let lastMonth = -1;
  calendar.weeks.forEach((week, index) => {
    const first = week.days[0];
    if (!first) return;

    const date = new Date(`${first.date}T00:00:00`);
    const month = date.getMonth();
    if (month === lastMonth) return;
    lastMonth = month;

    /*
      The calendar starts mid-month, so column 0 belongs to a month that is
      nearly over. Labelling it would crowd out the next month's label — drop
      the leading stub instead, which is the one nobody is looking for.
    */
    if (index === 0 && date.getDate() > 7) return;

    const previous = monthLabels[monthLabels.length - 1];
    if (previous && index - previous.index < 3) return;

    monthLabels.push({ index, label: MONTHS[month] });
  });

  return (
    <div className="heatmap">
      <div className="heatmap-header">
        <h3 className="heatmap-title">
          {calendar.totalContributions.toLocaleString()} contributions in the last year
        </h3>
      </div>

      {/* Wide content: scrolls inside its own box so the page never scrolls sideways. */}
      <div className="heatmap-scroll">
        <div className="heatmap-inner">
          <div className="heatmap-months">
            {monthLabels.map(({ index, label }) => (
              <span
                key={`${label}-${index}`}
                className="heatmap-month"
                style={{ gridColumn: index + 1 }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="heatmap-grid">
            {calendar.weeks.map((week, weekIndex) => (
              <div className="heatmap-week" key={weekIndex}>
                {Array.from({ length: 7 }, (_, weekday) => {
                  const day = week.days.find(d => d.weekday === weekday);
                  if (!day) {
                    return <span className="heatmap-day is-empty" key={weekday} />;
                  }
                  return (
                    <span
                      key={day.date}
                      className="heatmap-day"
                      data-level={levelFor(day.count, max)}
                      title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="heatmap-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <span className="heatmap-day" data-level={level} key={level} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
