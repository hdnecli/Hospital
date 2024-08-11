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

        public DbSet<Tani> Tanilar { get; set; }
        public DbSet<Favori> Favoriler { get; set; }
        public DbSet<Kullanici> Kullanicilar { get; set; }

        // Diğer DbSet tanımlamaları burada yer alacak...
    }
}
