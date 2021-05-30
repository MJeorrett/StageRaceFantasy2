﻿using StageRaceFantasy.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("FantasyRaceTeam")]
    public class FantasyRaceTeamEntity : IEntity
    {
        [Column("FantasyRaceTeamId")]
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public int FantasyRaceId { get; set; }
        public FantasyRaceEntity FantasyRace { get; set; } = null!;
    }
}
