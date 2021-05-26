using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("Rider")]
    public record RiderEntity
    {
        [Column("RiderId")]
        public int Id { get; init; }

        public string FirstName { get; init; } = "";

        public string LastName { get; init; } = "";
    }
}
