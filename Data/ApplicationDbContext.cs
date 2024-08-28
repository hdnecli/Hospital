using Microsoft.EntityFrameworkCore;
using TaniProjesi.Models;

namespace TaniProjesi.Data // YourProjectNamespace kısmını projenizin namespace'i ile değiştirin
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
        public DbSet<Hastalar> Hastalar {get; set; }
        public DbSet<Ilaclar> Ilaclar { get; set; }
    }
}
