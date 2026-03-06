$(document).ready(function () {
    $(document).on('click', '.logout-link', function (e) {
        e.preventDefault();

        
        const baseUrl = $(this).attr('href');
        
        
        const logoutUrlAjax = baseUrl + '_ajax'; 

        Swal.fire({
            title: '¿Cerrar sesión?',
            text: 'Tu sesión se cerrará y tendrás que iniciar nuevamente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            //  Detenemos el cierre automático al confirmar
            showLoaderOnConfirm: true,
            preConfirm: () => {
                // Al confirmar, transformamos este modal en un spinner de carga
                Swal.update({
                    title: 'Cerrando sesión...',
                    text: 'Por favor espera un momento.',
                    icon: undefined, // Elimina el icono de advertencia
                    showCancelButton: false,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                Swal.showLoading();
                
                // Ejecutamos el AJAX dentro de preConfirm, devolviendo la promesa
                return $.ajax({
                    url: logoutUrlAjax,
                    method: 'POST',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    dataType: 'json'
                }).fail(function() {
                    // Si el AJAX falla, lanza un error para que el catch lo capture
                    Swal.hideLoading();
                    Swal.showValidationMessage('Ocurrió un error de red o servidor al cerrar la sesión');
                });
            }
        }).then(result => {
            // El `result` contiene la respuesta del AJAX (si fue exitoso) o la razón del rechazo (si fue cancelado o hubo error de preConfirm)
            if (result.isConfirmed && result.value && result.value.success) {

                Swal.fire({
                    title: 'Sesión cerrada',
                    text: 'Hasta pronto 👋',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    // Redirige a la página de inicio de sesión después del éxito
                    window.location.href = result.value.redirect;
                });
            } else if (result.isConfirmed && result.value && !result.value.success) {
                // Maneja error de respuesta JSON del servidor
                Swal.hideLoading();
                Swal.fire('Error', result.value.message || 'No se pudo cerrar la sesión', 'error');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // No hace nada si el usuario cancela (no necesitamos cerrar nada)
            } else if (result.isDenied || result.isDismissed) {
                // Si hubo un error en preConfirm (red o servidor), SweetAlert ya mostró el mensaje
            }
        });
    });
});
