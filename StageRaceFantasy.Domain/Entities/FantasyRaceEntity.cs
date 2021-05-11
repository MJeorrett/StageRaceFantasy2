using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("FantasyRace")]
    public record FantasyRaceEntity
    {
        [Column("FantasyRaceId")]
        public int Id { get; init; }

        public string Name { get; init; } = "";

        public DateTime StartDate { get; init; }

        public DateTime EndDate { get; init; }

        public int FantasyTeamSize { get; init; }

        public List<FantasyRaceTeamEntity> FantasyTeams { get; set; } = new();
    }
}
