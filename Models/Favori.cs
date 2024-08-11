namespace HastaneNamespace.Models
{
public class Favori
{
    public int ID { get; set; }
    public int Tani_ID { get; set; }
    public Tani? Tani { get; set; } // Nullable olarak işaretleniyor
    public int Kullanici_kodu { get; set; }
    public Kullanici? Kullanici { get; set; } // Nullable olarak işaretleniyor
}

}
