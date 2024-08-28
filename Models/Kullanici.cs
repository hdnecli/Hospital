namespace TaniProjesi.Models
{
    public class Kullanici
    {
        public int ID { get; set; }
        public required string Kullanici_adi { get; set; }
        public required string Sifre { get; set; }
        public int Durum { get; set; }
    }
}
