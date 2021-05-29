using AutoMapper;
using NUnit.Framework;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.FantasyRaces.Commands;
using StageRaceFantasy.Application.FantasyRaces.Dtos;
using StageRaceFantasy.Application.FantasyTeam.Commands;
using StageRaceFantasy.Application.FantasyTeam.Dtos;
using StageRaceFantasy.Application.Riders.Commands;
using StageRaceFantasy.Application.Riders.Dtos;
using StageRaceFantasy.Domain.Entities;
using System;
using System.Runtime.Serialization;

namespace StageRaceFantasy.Application.UnitTests.Common.Mapping
{
    public class AppMappingProfileTests
    {
        private readonly IConfigurationProvider _configuration;
        private readonly IMapper _mapper;

        public AppMappingProfileTests()
        {
            _configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AppMappingProfile>();
            });

            _mapper = _configuration.CreateMapper();
        }

        [Test]
        public void ShouldHaveValidConfiguration()
        {
            _configuration.AssertConfigurationIsValid();
        }

        [Test]
        // Rider
        [TestCase(typeof(CreateRiderCommand), typeof(RiderEntity))]
        [TestCase(typeof(RiderEntity), typeof(RiderSummaryDto))]
        [TestCase(typeof(RiderEntity), typeof(RiderDetailsDto))]

        // Fantasy Race
        [TestCase(typeof(CreateFantasyRaceCommand), typeof(FantasyRaceEntity))]
        [TestCase(typeof(FantasyRaceEntity), typeof(FantasyRaceNameDto))]
        [TestCase(typeof(FantasyRaceEntity), typeof(FantasyRaceSummaryDto))]
        [TestCase(typeof(FantasyRaceEntity), typeof(FantasyRaceDetailsDto))]

        // Fantasy Race Team
        [TestCase(typeof(CreateFantasyTeamCommand), typeof(FantasyRaceTeamEntity))]
        [TestCase(typeof(FantasyRaceTeamEntity), typeof(FantasyTeamSummaryDto))]
        public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
        {
            var instance = GetInstanceOf(source);

            _mapper.Map(instance, source, destination);
        }

        private static object GetInstanceOf(Type type)
        {
            if (type.GetConstructor(Type.EmptyTypes) != null)
                return Activator.CreateInstance(type);

            // Type without parameterless constructor
            return FormatterServices.GetUninitializedObject(type);
        }
    }
}
