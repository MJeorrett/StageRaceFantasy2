using StageRaceFantasy.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("FantasyTeam")]
    public class FantasyTeamEntity : IEntity
    {
        [Column("FantasyTeamId")]
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public int RaceId { get; set; }
        public RaceEntity Race { get; set; } = null!;
    }
}
