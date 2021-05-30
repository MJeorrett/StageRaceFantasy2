using StageRaceFantasy.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace StageRaceFantasy.Domain.Entities
{
    [Table("RiderRaceEntry")]
    public class RiderRaceEntryEntity : IEntity
    {
        [Column("RiderRaceEntryId")]
        public int Id { get; set; }

        public int RiderId { get; set; }
        public RiderEntity Rider { get; set; } = null!;
        
        public int RaceId { get; set; }
        public RaceEntity Race { get; set; } = null!;
    }
}
