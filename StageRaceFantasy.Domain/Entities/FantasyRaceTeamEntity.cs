using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("FantasyRaceTeam")]
    public record FantasyRaceTeamEntity
    {
        [Column("FantasyRaceTeamId")]
        public int Id { get; init; }

        public string Name { get; init; } = "";

        public int FantasyRaceId { get; set; }
        public FantasyRaceEntity FantasyRace { get; init; } = null!;
    }
}
