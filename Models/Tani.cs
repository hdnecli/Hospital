using System.ComponentModel.DataAnnotations.Schema;

namespace HastaneNamespace.Models
{
    [Table("Tani")]
    public class Tani
    {
        public int ID { get; set; }
        public required string Tani_kodu { get; set; }
        public required string Tani_adi { get; set; }
        public int Durum { get; set; }
    }
}
