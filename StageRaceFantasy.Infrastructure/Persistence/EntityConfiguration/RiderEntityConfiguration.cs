using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StageRaceFantasy.Domain.Entities;

namespace StageRaceFantasy.Infrastructure.Persistence.EntityConfiguration
{
    public class RiderEntityConfiguration : IEntityTypeConfiguration<RiderEntity>
    {
        public void Configure(EntityTypeBuilder<RiderEntity> builder)
        {
            builder.Property(_ => _.FirstName)
                .HasColumnType("varchar(256)");

            builder.Property(_ => _.LastName)
                .HasColumnType("varchar(256)");
        }
    }
}
