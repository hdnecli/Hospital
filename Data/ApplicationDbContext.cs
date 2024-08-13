using Microsoft.EntityFrameworkCore;
using HastaneNamespace.Models;

namespace HastaneNamespace.Data // YourProjectNamespace kısmını projenizin namespace'i ile değiştirin
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Tani> Tani { get; set; }
        public DbSet<Favori> Favori { get; set; }
        public DbSet<Kullanici> Kullanici { get; set; }

        // Diğer DbSet tanımlamaları burada yer alacak...
    }
}
