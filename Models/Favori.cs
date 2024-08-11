namespace HastaneNamespace.Models
{
    public class Favori
    {
        public int ID { get; set; }
        public int Tani_ID { get; set; }
        public int Kullanici_kodu { get; set; }

        public required Tani Tani { get; set; }
        public required Kullanici Kullanici { get; set; }
    }
}
