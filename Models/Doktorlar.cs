namespace TaniProjesi.Models
{
public class Doktorlar
{
    public int ID { get; set; }
    public required string Doktor_Adi { get; set; }
    public required string Doktor_Soyadi { get; set; }
    public long Doktor_TC { get; set; }
    public DateTime Ise_Giris_Tarihi { get; set; }
    public DateTime Isten_Ayrilis_Tarihi { get; set; }
    public required string Aktif { get; set; }
}
}