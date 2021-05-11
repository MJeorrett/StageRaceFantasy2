using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Options;
using StageRaceFantasy.Application.Common.ExternalInterfaces;
using StageRaceFantasy.Domain.Entities;
using System;

namespace StageRaceFantasy.Infrastructure.Persistence
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
    {
        public DbSet<FantasyStageRaceEntity> FantasyStageRaces { get; init; } = null!;

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            SpecifyDatesKindAsUtcWhenRetrieving(builder);

            base.OnModelCreating(builder);
        }

        private static void SpecifyDatesKindAsUtcWhenRetrieving(ModelBuilder builder)
        {
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                    v => v,
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

                var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>(
                    v => v,
                    v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v);

                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(dateTimeConverter);
                    }
                    else if (property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(nullableDateTimeConverter);
                    }
                }
            }
        }
    }
}
