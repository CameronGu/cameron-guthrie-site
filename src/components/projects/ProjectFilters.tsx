import { useId } from 'react';
import { Tag } from '../site/Tag';

type StatusFilter = 'all' | 'active' | 'in-dev' | 'archived';

type ProjectFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
  status: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  tags: string[];
  resultCount: number;
};

const statusOptions: { label: string; value: StatusFilter }[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'In development', value: 'in-dev' },
  { label: 'Archived', value: 'archived' },
];

export function ProjectFilters({
  query,
  onQueryChange,
  selectedTag,
  onTagChange,
  status,
  onStatusChange,
  tags,
  resultCount,
}: ProjectFiltersProps) {
  const searchId = useId();
  const statusId = useId();

  return (
    <div className="space-y-6 rounded-3xl border border-border/60 bg-background/60 p-6 backdrop-blur">
      <div className="flex flex-col gap-2">
        <label htmlFor={searchId} className="text-sm font-medium text-muted">
          Search projects
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Filter by keyword"
          className="w-full rounded-full border border-border/70 bg-background px-5 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted">Tags</p>
        <div className="flex flex-wrap gap-2">
          <Tag
            as="button"
            active={selectedTag === null}
            onClick={() => onTagChange(null)}
            className="text-xs font-semibold"
          >
            All
          </Tag>
          {tags.map((tag) => (
            <Tag
              key={tag}
              as="button"
              active={selectedTag === tag}
              onClick={() =>
                onTagChange(selectedTag === tag ? null : tag)
              }
              className="text-xs font-semibold capitalize"
              aria-pressed={selectedTag === tag}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={statusId} className="text-sm font-medium text-muted">
          Status
        </label>
        <select
          id={statusId}
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as StatusFilter)
          }
          className="w-full rounded-full border border-border/70 bg-background px-5 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <p
        className="text-sm text-muted"
        aria-live="polite"
        aria-atomic="true"
      >
        {resultCount} {resultCount === 1 ? 'project' : 'projects'} shown
      </p>
    </div>
  );
}
