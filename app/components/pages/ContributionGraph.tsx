"use client";
import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";
import { github } from "@/app/data/contribution-graph-theme";
import { useState, useEffect, Component, ReactNode } from "react";
import YearButton from "../shared/YearButton";
import { getGitHubYears } from "@/app/utils/calculate-years";
import EmptyState from "../shared/EmptyState";
import { IoIosAnalytics } from "react-icons/io";

class GitHubCalendarErrorBoundary extends Component<
  {
    children: ReactNode;
    username: string;
    resetKey?: string | number;
  },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log(`Calendar error for @${this.props.username}:`, error.message);
  }

  componentDidUpdate(prevProps: { resetKey?: string | number }) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-sm text-zinc-500 dark:text-zinc-400 py-8 text-center">
          No contribution data available for this account yet.
        </div>
      );
    }
    return this.props.children;
  }
}

function SafeGitHubCalendar({
  username,
  theme,
  colorScheme,
  blockSize,
  year,
  showWeekdayLabels,
}: {
  username: string;
  theme: any;
  colorScheme: "light" | "dark" | undefined;
  blockSize: number;
  year: number | undefined;
  showWeekdayLabels: boolean;
}) {
  return (
    <GitHubCalendarErrorBoundary
      username={username}
      resetKey={`${username}-${year}`}
    >
      <GitHubCalendar
        username={username}
        theme={theme}
        colorScheme={colorScheme}
        blockSize={blockSize}
        year={year}
        showWeekdayLabels={showWeekdayLabels}
        errorMessage=""
      />
    </GitHubCalendarErrorBoundary>
  );
}

export default function ContributionGraph() {
  const [calendarYear, setCalendarYear] = useState<number | undefined>(
    undefined
  );
  const { theme, systemTheme } = useTheme();
  const [serverTheme, setServerTheme] = useState<"light" | "dark" | undefined>(
    undefined
  );
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  useEffect(() => {
    setServerTheme(scheme);
  }, [scheme]);

  const today = new Date().getFullYear();
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const secondaryUsername = "ha-wang-1193";
  const joinYear = Number(process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR);
  const years = getGitHubYears(joinYear);

  if (!username || !joinYear)
    return (
      <EmptyState
        icon={<IoIosAnalytics />}
        title="Unable to load Contribution Graph"
        message="We could not find any GitHub credentials added to the .env file. To display the graph, provide your username and the year you joined GitHub"
      />
    );

  return (
    <div className="flex xl:flex-row flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit">
          <div className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            @{username}
          </div>
          <SafeGitHubCalendar
            username={username}
            theme={github}
            colorScheme={serverTheme}
            blockSize={13}
            year={calendarYear}
            showWeekdayLabels={true}
          />
          <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Note: Displays public contributions. For organization contributions,
            ensure they're public on your{" "}
            <a
              href="https://github.com/settings/profile"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              GitHub settings
            </a>
            .
          </div>
        </div>

        <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit">
          <div className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            @{secondaryUsername}
          </div>
          <div key={`${secondaryUsername}-${calendarYear || today}`}>
            <SafeGitHubCalendar
              username={secondaryUsername}
              theme={github}
              colorScheme={serverTheme}
              blockSize={13}
              year={
                calendarYear && calendarYear >= 2025 ? calendarYear : undefined
              }
              showWeekdayLabels={true}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start xl:flex-col flex-row flex-wrap gap-2">
        {years.slice(0, 5).map((year) => (
          <YearButton
            key={year}
            year={year}
            currentYear={calendarYear ?? today}
            onClick={() =>
              setCalendarYear(year === calendarYear ? undefined : year)
            }
          />
        ))}
      </div>
    </div>
  );
}
