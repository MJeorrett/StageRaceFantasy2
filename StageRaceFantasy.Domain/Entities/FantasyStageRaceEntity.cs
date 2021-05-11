using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("FantasyStageRace")]
    public record FantasyStageRaceEntity
    {
        [Column("FantasyStageRaceId")]
        public int Id { get; init; }

        public string Name { get; init; } = "";

        public DateTime StartDate { get; init; }

        public DateTime EndDate { get; init; }

        public int FantasyTeamSize { get; init; }
    }
}
