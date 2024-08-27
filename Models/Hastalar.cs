using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HastaneNamespace.Models
{
    public class Hastalar
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HastaNo { get; set; } // Birincil Anahtar
        public required string Adi { get; set; }
        public required string Soyadi { get; set; }
        public required string BabaAdi { get; set; }
        public required string AnneAdi { get; set; }
        public required DateTime DogumTarihi { get; set; }
        public required string Telefon { get; set; }
        public required string Adres { get; set; }
        public required string Aktif { get; set; } = "1";
    }
}
