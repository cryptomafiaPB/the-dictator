import prisma from "@/lib/prisma";

export default async function AnalyticsPage() {
  // Fetch total articles
  const totalArticles = await prisma.article.count({
    where: { published: true },
  });

  // Fetch total users
  const totalUsers = await prisma.user.count();

  // Fetch popular articles (sorted by views or interactions)
  const popularArticles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: 5,
  });

  // Fetch recent user activity (e.g., logins)
  const recentActivity = await prisma.user.findMany({
    orderBy: { lastLogin: "desc" },
    take: 5,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-bold">Total Articles</h2>
          <p className="text-2xl">{totalArticles}</p>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-bold mb-4">Popular Articles</h2>
          <div className="space-y-4">
            {popularArticles.map((article: any) => (
              <div key={article.id} className="border p-4 rounded">
                <h3 className="text-xl font-bold">{article.title}</h3>
                <p>{article.content.substring(0, 100)}...</p>
                <p className="text-sm text-gray-600">Views: {article.views}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-lg font-bold mb-4">Recent User Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((user: any) => (
              <div key={user.id} className="border p-4 rounded">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-sm text-gray-600">
                  Last Login: {user.lastLogin?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
