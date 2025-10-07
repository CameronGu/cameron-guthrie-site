import { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../site/Card';
import { ProjectFilters } from './ProjectFilters';

type ProjectStatus = 'active' | 'in-dev' | 'archived';

export type ProjectListItem = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  status: ProjectStatus;
  repo?: string;
  demo?: string;
  featured?: boolean;
};

type ProjectsGridProps = {
  items: ProjectListItem[];
  initialTag?: string | null;
  initialQuery?: string;
  initialStatus?: 'all' | ProjectStatus;
};

export default function ProjectsGrid({
  items,
  initialTag = null,
  initialQuery = '',
  initialStatus = 'all',
}: ProjectsGridProps) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [selectedTag, setSelectedTag] = useState<string | null>(
    initialTag ?? null,
  );
  const [status, setStatus] = useState<'all' | ProjectStatus>(initialStatus);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    return items
      .filter((item) => {
        if (query.trim()) {
          const needle = query.trim().toLowerCase();
          const haystack = [
            item.title,
            item.summary,
            item.tags.join(' '),
            item.status,
          ]
            .join(' ')
            .toLowerCase();
          if (!haystack.includes(needle)) {
            return false;
          }
        }

        if (selectedTag && !item.tags.includes(selectedTag)) {
          return false;
        }

        if (status !== 'all' && item.status !== status) {
          return false;
        }

        return true;
      })
      .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  }, [items, query, selectedTag, status]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)]">
      <ProjectFilters
        query={query}
        onQueryChange={setQuery}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        status={status}
        onStatusChange={setStatus}
        tags={tags}
        resultCount={filtered.length}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.length ? (
          filtered.map((project) => (
            <Card key={project.slug} highlight={project.featured}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-muted">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/60 px-3 py-1 capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </CardContent>
              <CardFooter className="flex flex-col gap-2 text-sm text-muted">
                <div className="flex items-center justify-between">
                  <span className="capitalize">
                    {project.status.replace('-', ' ')}
                  </span>
                  <a
                    href={`/projects/${project.slug}`}
                    className="font-medium text-foreground underline-offset-4 transition hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    View detail
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 text-xs">
                  {project.repo ? (
                    <a
                      href={project.repo}
                      className="inline-flex items-center gap-2 text-muted underline-offset-4 transition hover:text-accent hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repo
                    </a>
                  ) : null}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      className="inline-flex items-center gap-2 text-muted underline-offset-4 transition hover:text-accent hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Demo
                    </a>
                  ) : null}
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-border/60 bg-background/60 p-8 text-center text-sm text-muted">
            No projects match those filters yet. Try clearing a filter or adjusting the search.
          </div>
        )}
      </div>
    </div>
  );
}
