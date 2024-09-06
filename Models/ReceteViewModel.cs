namespace TaniProjesi.Models
{
    public class ReceteViewModel
    {
        public required Hastalar Hasta { get; set; }
        public required List<Ilaclar> Ilaclar { get; set; }
    }
}