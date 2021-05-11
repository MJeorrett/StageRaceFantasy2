using AutoMapper;
using NUnit.Framework;
using StageRaceFantasy.Application.Common.Mapping;
using StageRaceFantasy.Application.FantasyStageRaces.Commands;
using StageRaceFantasy.Application.FantasyStageRaces.Dtos;
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
        [TestCase(typeof(CreateFantasyStageRaceCommand), typeof(FantasyStageRaceEntity))]
        [TestCase(typeof(FantasyStageRaceEntity), typeof(FantasyStageRaceSummaryDto))]
        [TestCase(typeof(FantasyStageRaceEntity), typeof(FantasyStageRaceDetailsDto))]
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
