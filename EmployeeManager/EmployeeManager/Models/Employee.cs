using System;

namespace EmployeeManager.Models
{
    public class Employee
    {
        public Guid Id { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string JobTitle { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastModified { get; set; }
    }
}