import React from 'react';

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-menu-2 ${className || ''}`} />);
export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-moon ${className || ''}`} />);
export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-sun ${className || ''}`} />);
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-search ${className || ''}`} />);
export const ChevronDownIcon: React.FC<{ className?: string; isRotated?: boolean }> = ({ className, isRotated }) => (<i className={`ti ti-chevron-down transition-transform duration-200 ${isRotated ? '-rotate-180' : ''} ${className || ''}`} />);
export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-file-text ${className || ''}`} />);
export const BookIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-book ${className || ''}`} />);
export const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-folder ${className || ''}`} />);
export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-x ${className || ''}`} />);
export const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-copy ${className || ''}`} />);
export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-check ${className || ''}`} />);
export const ExpandIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-arrows-maximize ${className || ''}`} />);
export const LineNumbersIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-hash ${className || ''}`} />);
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-settings ${className || ''}`} />);
export const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-brand-github ${className || ''}`} />);
export const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-brand-twitter ${className || ''}`} />);
export const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-brand-discord ${className || ''}`} />);
export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-brand-linkedin ${className || ''}`} />);
export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-pencil ${className || ''}`} />);
export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-chevron-left ${className || ''}`} />);
export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-chevron-right ${className || ''}`} />);
export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-calendar ${className || ''}`} />);
export const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-user-circle ${className || ''}`} />);

// Admonition Icons
export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-info-circle ${className || ''}`} />);
export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-bulb ${className || ''}`} />);
export const WarningTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-alert-triangle ${className || ''}`} />);
export const DangerIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-alert-octagon ${className || ''}`} />);
export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-circle-check ${className || ''}`} />);
export const QuestionIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-help-circle ${className || ''}`} />);
export const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-quote ${className || ''}`} />);
export const ExampleIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-beaker ${className || ''}`} />);
export const BugIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-bug ${className || ''}`} />);
export const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-circle-x ${className || ''}`} />);
export const ExclamationCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-alert-circle ${className || ''}`} />);

export const ZoomInIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-zoom-in ${className || ''}`} />);
export const FileCodeIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-file-code ${className || ''}`} />);

// CTA Icons
export const RocketIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-rocket ${className || ''}`} />);
export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-download ${className || ''}`} />);
export const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-player-play ${className || ''}`} />);
export const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-player-pause ${className || ''}`} />);
export const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-external-link ${className || ''}`} />);
export const AudioWaveformIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-broadcast ${className || ''}`} />);
export const VideoCameraIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-video ${className || ''}`} />);
export const MessageIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-message-circle ${className || ''}`} />);
export const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-book-2 ${className || ''}`} />);
export const CodeBracketIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-code ${className || ''}`} />);
export const LayoutIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-layout-grid ${className || ''}`} />);
export const PaperAirplaneIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-send ${className || ''}`} />);
export const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-refresh ${className || ''}`} />);
export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-eye ${className || ''}`} />);
export const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-eye-off ${className || ''}`} />);
export const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-sparkles ${className || ''}`} />);
export const AcademicCapIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-school ${className || ''}`} />);
export const ClipboardListIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-clipboard-text ${className || ''}`} />);
export const LightbulbIdeaIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-bulb ${className || ''}`} />);
export const TranslateIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-language ${className || ''}`} />);
export const VersionsIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-layers-subtract ${className || ''}`} />);
export const ListIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-list ${className || ''}`} />);

// FeatureList Icons
export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-shield-check ${className || ''}`} />);
export const BoltIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-bolt ${className || ''}`} />);
export const ScaleIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-scale ${className || ''}`} />);

// ComparisonTable Icon
export const MinusIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-minus ${className || ''}`} />);

// Math Icon
export const MathSymbolsIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-math-symbols ${className || ''}`} />);

// Chart Icon
export const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-chart-bar ${className || ''}`} />);

// Scrollytelling Icon
export const PresentationAnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-presentation-analytics ${className || ''}`} />);

// TutorialSlider Icon
export const SlideshowIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-slideshow ${className || ''}`} />);

// StatCards Icons
export const TrendingUpIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-trending-up ${className || ''}`} />);
export const ServerIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-server-2 ${className || ''}`} />);
export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-users ${className || ''}`} />);
export const NumberIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-123 ${className || ''}`} />);

// RestClient Icon
export const WorldIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-world ${className || ''}`} />);

// Maintenance Icon
export const ToolsIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-tools ${className || ''}`} />);

// Animate Icon
export const WandIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-wand ${className || ''}`} />);

// About Icon
export const InfoCircleIcon: React.FC<{ className?: string }> = ({ className }) => (<i className={`ti ti-info-circle ${className || ''}`} />);