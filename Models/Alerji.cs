namespace TaniProjesi.Models
{
    public class Alerji
    {
        public int ID { get; set; }
        public required string Alerji_Adi { get; set; }
        public required string Aktif { get; set; } = "E";
    }
}