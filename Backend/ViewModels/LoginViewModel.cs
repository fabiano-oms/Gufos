using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels {
    public class LoginViewModel {
        [Required]
        [StringLength(255, MinimumLength = 3)]
        public string Email { get; set; }

        [Required]
        public string Senha { get; set; }


    }

}