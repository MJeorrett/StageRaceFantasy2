using System;

namespace StageRaceFantasy.Application.Common.InternalInterfaces
{
    public interface IHasStartAndEndDate
    {
        public DateTime StartDate { get; }
        public DateTime EndDate { get; }
    }
}
