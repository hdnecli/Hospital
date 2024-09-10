using Microsoft.EntityFrameworkCore;
using TaniProjesi.Models;

namespace TaniProjesi.Data 
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
        public DbSet<Doktorlar> Doktorlar { get; set; }
        public DbSet<Doktor_Servisleri> Doktor_Servisleri { get; set; }
        public DbSet<Verilis_Yollari> Verilis_Yollari { get; set; }
        public DbSet<Recete> Recete { get; set; }
        public DbSet<ReceteTanilari> ReceteTanilari { get; set; }
    }
}
