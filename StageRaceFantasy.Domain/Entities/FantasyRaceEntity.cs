using StageRaceFantasy.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("FantasyRace")]
    public class FantasyRaceEntity : IEntity
    {
        [Column("FantasyRaceId")]
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int FantasyTeamSize { get; set; }

        public List<FantasyRaceTeamEntity> FantasyTeams { get; set; } = new();

        public List<RiderFantasyRaceEntryEntity> RiderFantasyRaceEntries { get; set; } = new();
        public List<RiderEntity> Riders { get; set; } = new();
    }
}
