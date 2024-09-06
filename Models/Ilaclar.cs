namespace TaniProjesi.Models
{
public class Ilaclar
{
    public int ID {get; set; }
    public required string Barkod {get; set; }
    public required string Ilac_adi {get; set; }
    public bool Sgk_oder_mi {get; set; }
}
}
