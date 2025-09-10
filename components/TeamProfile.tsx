import React, { useMemo } from 'react';
import matter from 'gray-matter';
import NestedMarkdown from './NestedMarkdown';
import { GitHubIcon, TwitterIcon, LinkedInIcon } from './Icons';
import { useI18n } from '../context/I18nContext';

// --- Type Definitions ---
interface SocialLink {
    icon: 'GitHub' | 'Twitter' | 'LinkedIn';
    url: string;
}

interface TeamMember {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    social?: SocialLink[];
}

interface TeamProfileProps {
    content: string;
}

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    GitHub: GitHubIcon,
    Twitter: TwitterIcon,
    LinkedIn: LinkedInIcon,
};

// --- Sub-component: MemberCard ---
const MemberCard: React.FC<TeamMember> = ({ name, role, avatar, bio, social }) => {
    const { t } = useI18n();
    return (
        <div className="text-center bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-transform transform hover:-translate-y-1">
            <img className="mx-auto h-24 w-24 rounded-full" src={avatar} alt={t('photoOf', name)} loading="lazy" />
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
            <p className="mt-1 text-sm font-semibold text-primary-600 dark:text-primary-400">{role}</p>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <NestedMarkdown content={bio} />
            </div>
            {social && social.length > 0 && (
                <div className="mt-4 flex justify-center space-x-3">
                    {social.map((link, index) => {
                        const IconComponent = iconMap[link.icon];
                        if (!IconComponent) return null;
                        return (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <span className="sr-only">{link.icon}</span>
                                <IconComponent className="h-6 w-6" />
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
};


// --- Main Component: TeamProfile ---
const TeamProfile: React.FC<TeamProfileProps> = ({ content }) => {
    const { t } = useI18n();
    const { members, columns } = useMemo(() => {
        try {
            const { data } = matter(content);
            const validColumns = [2, 3, 4].includes(data.columns) ? data.columns : 3;
            return {
                members: (data.members as TeamMember[]) || [],
                columns: validColumns,
            };
        } catch (e) {
            console.error("Error parsing TeamProfile YAML:", e);
            return { members: [], columns: 3 };
        }
    }, [content]);

    if (members.length === 0) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('teamProfileError')}</p>
                <p>{t('teamProfileErrorDetails')}</p>
            </div>
        );
    }

    const gridClasses = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    };

    return (
        <div className="my-8">
            <div className={`grid grid-cols-1 gap-8 ${gridClasses[columns]}`}>
                {members.map((member, index) => (
                    <MemberCard key={index} {...member} />
                ))}
            </div>
        </div>
    );
};

export default TeamProfile;
