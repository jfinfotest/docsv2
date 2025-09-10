import React, { useEffect, useRef, useMemo } from 'react';
import matter from 'gray-matter';
import { useDarkMode } from '../hooks/useDarkMode';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

// Use ChartJS as Chart for compatibility
const Chart = ChartJS;

interface ChartProps {
    content: string;
}

const Charts: React.FC<ChartProps> = ({ content }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<any>(null);
    const [isDarkMode] = useDarkMode();
    const { appThemes, appTheme } = useTheme();
    const { t } = useI18n();

    const chartConfig = useMemo(() => {
        try {
            const { data } = matter(content);
            return data;
        } catch (e) {
            console.error("Error parsing chart YAML:", e);
            return null;
        }
    }, [content]);

    const themeColors = useMemo(() => {
        const currentPalette = appThemes.find(t => t.id === appTheme) || appThemes[0];
        return {
            primary: currentPalette.colors['primary-500'],
            primaryLight: currentPalette.colors['primary-200'],
            gridColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            textColor: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#666',
        };
    }, [appTheme, appThemes, isDarkMode]);

    useEffect(() => {
        if (!chartRef.current || !chartConfig || typeof Chart === 'undefined') {
            return;
        }

        // Destroy previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Sensible defaults and theme integration
        const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: themeColors.textColor,
                    },
                },
            },
            scales: {
                y: {
                    ticks: { color: themeColors.textColor },
                    grid: { color: themeColors.gridColor },
                },
                x: {
                    ticks: { color: themeColors.textColor },
                    grid: { color: themeColors.gridColor },
                },
            },
        };

        // For pie/doughnut charts, scales are not applicable
        if (chartConfig.type === 'pie' || chartConfig.type === 'doughnut') {
            delete (defaultOptions as any).scales;
        }

        // Deep merge user options with defaults
        const finalOptions = { ...defaultOptions, ...chartConfig.options };
        
        // Auto-assign theme colors if not provided
        chartConfig.data.datasets.forEach((dataset: any, index: number) => {
             const colors = [
                '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#2dd4bf'
            ];
            const color = colors[index % colors.length];

            if (!dataset.backgroundColor) {
                 dataset.backgroundColor = chartConfig.type === 'line' ? 'transparent' : `${color}80`;
            }
             if (!dataset.borderColor) {
                dataset.borderColor = color;
            }
        });


        chartInstanceRef.current = new Chart(ctx, {
            type: chartConfig.type,
            data: chartConfig.data,
            options: finalOptions,
        });

        // Cleanup function
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [chartConfig, themeColors]);

    if (!chartConfig) {
        return (
            <div className="my-6 p-4 border-l-4 rounded-r-lg bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200">
                <p className="font-bold">{t('chartConfigError')}</p>
                <p>{t('chartConfigErrorDetails')}</p>
            </div>
        );
    }

    return (
        <div className="my-8 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
            {chartConfig.title && <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">{chartConfig.title}</h3>}
            <div className="relative h-96">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default Charts;
