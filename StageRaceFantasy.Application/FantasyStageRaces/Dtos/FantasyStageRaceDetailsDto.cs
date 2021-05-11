using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Domain.Entities;
using System;

namespace StageRaceFantasy.Application.FantasyStageRaces.Dtos
{
    public record FantasyStageRaceDetailsDto : IMapFrom<FantasyStageRaceEntity>
    {
        public int Id { get; init; }

        public string Name { get; init; } = "";

        public DateTime StartDate { get; init; }

        public DateTime EndDate { get; init; }

        public int FantasyTeamSize { get; set; }
    }
}
