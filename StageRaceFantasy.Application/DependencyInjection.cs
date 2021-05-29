using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using StageRaceFantasy.Application.Common.Behaviours;
using StageRaceFantasy.Application.FantasyRaces.Commands;
using System.Reflection;

namespace StageRaceFantasy.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AppRequestValidationBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(GenericAppRequestValidationBehaviour<,>));

            return services;
        }

        public static IMvcBuilder AddApplicationFluentValidation(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.AddFluentValidation(fv =>
            {
                fv.RegisterValidatorsFromAssemblyContaining<CreateFantasyRaceCommandValidator>();
                fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                fv.ImplicitlyValidateChildProperties = true;
            });

            return mvcBuilder;
        }
    }
}
