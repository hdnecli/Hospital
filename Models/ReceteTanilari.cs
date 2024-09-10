namespace TaniProjesi.Models
{
    public class ReceteTanilari
    {
        public int ID { get; set; }
        public int ReceteID { get; set; }
        public required string TaniKodu { get; set; }
        public required string Aktif { get; set; } 
    }
}