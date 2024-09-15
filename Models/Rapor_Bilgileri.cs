namespace TaniProjesi.Models
{
    public class Rapor_Bilgileri
    {
        public int ID { get; set; }
        public int HastaNo { get; set; }
        public DateTime BaslangicTarihi { get; set; }
        public DateTime BitisTarihi { get; set; }
        public string? RaporBitiminde { get; set; }
        public string? Rapor_Notu { get; set; }
        public string? Tanilar { get; set; }
        public int OnaylayacakDoktor { get; set; }
        public int OnaylananServis { get; set; }
    }
}