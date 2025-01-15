// app/api/analytics/totals/route.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Helper function to calculate percentage change
const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current === 0 ? 0 : 100; // Handle division by zero
    return ((current - previous) / previous) * 100;
};

export async function GET() {
    try {
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // Fetch current month totals
        const [
            totalUsersCurrent,
            totalArticlesCurrent,
            totalCommentsCurrent,
            totalReportsCurrent,
        ] = await Promise.all([
            prisma.user.count({
                where: { createdAt: { gte: startOfCurrentMonth } },
            }),
            prisma.article.count({
                where: { createdAt: { gte: startOfCurrentMonth } },
            }),
            prisma.comment.count({
                where: { createdAt: { gte: startOfCurrentMonth } },
            }),
            prisma.report.count({
                where: { createdAt: { gte: startOfCurrentMonth } },
            }),
        ]);

        // Fetch last month totals
        const [
            totalUsersLast,
            totalArticlesLast,
            totalCommentsLast,
            totalReportsLast,
        ] = await Promise.all([
            prisma.user.count({
                where: {
                    createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
                },
            }),
            prisma.article.count({
                where: {
                    createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
                },
            }),
            prisma.comment.count({
                where: {
                    createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
                },
            }),
            prisma.report.count({
                where: {
                    createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
                },
            }),
        ]);

        // Calculate percentage changes
        const usersPercentageChange = calculatePercentageChange(
            totalUsersCurrent,
            totalUsersLast
        );
        const articlesPercentageChange = calculatePercentageChange(
            totalArticlesCurrent,
            totalArticlesLast
        );
        const commentsPercentageChange = calculatePercentageChange(
            totalCommentsCurrent,
            totalCommentsLast
        );
        const reportsPercentageChange = calculatePercentageChange(
            totalReportsCurrent,
            totalReportsLast
        );

        // Prepare response
        const response = {

            users: {
                current: totalUsersCurrent,
                lastMonth: totalUsersLast,
                percentageChange: usersPercentageChange,
            },
            articles: {
                current: totalArticlesCurrent,
                lastMonth: totalArticlesLast,
                percentageChange: articlesPercentageChange,
            },
            comments: {
                current: totalCommentsCurrent,
                lastMonth: totalCommentsLast,
                percentageChange: commentsPercentageChange,
            },
            reports: {
                current: totalReportsCurrent,
                lastMonth: totalReportsLast,
                percentageChange: reportsPercentageChange,
            },

        };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch analytics data' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}