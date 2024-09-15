namespace TaniProjesi.Models
{
    public class Alerji_Kayit
    {
        public int ID { get; set; }
        public int HastaNo { get; set; }
        public required string Alerji_Adi { get; set; }
        public string? Alerji_Notu { get; set; }
        public required string Guncelleyen { get; set; }
        public DateTime Guncelleme_Tarihi { get; set; } 
    }
}
