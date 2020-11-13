using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class StaffDBContext:DbContext
    {
        public StaffDBContext(DbContextOptions<StaffDBContext> options):base(options)
        {

        }

        public DbSet<Staff> DCandidates { get; set; }
    }

}
