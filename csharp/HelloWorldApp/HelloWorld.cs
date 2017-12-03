using System;
using System.Threading;
using DotNetify;

namespace HelloWorld
{
    public class HelloWorld : BaseVM
    {
        public class Person
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }
        public string Greetings { get; set; } = "Hello World!";
        public Action<Person> Submit => person =>
        {
            Greetings = $"Hello {person.FirstName}!";
            Changed(nameof(Greetings));
        };
    }
}