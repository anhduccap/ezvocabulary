// $(document).ready(function(){
//     $('.delete-word').on('click', function(e){
//       $target = $(e.$target)
//       const id = $target.attr('data-id');
//       $.ajax({
//         type:'DELETE',
//         url: '/word/'+id,
//         success: function(response){
//           alert('Deleting word');
//           window.location.href='/deck';
//         },
//         error: function(err){
//           console.log(err);
//         }
//       });
//     });
//   });