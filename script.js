let num = 0;
let totalOrder = [];

$("#alarm-close").on("click", function () {
  $("#pizza-added").fadeOut();
});

function checkout_msg() {
  let text = "<ol>";
  totalOrder.forEach((order) => {
    let pizza_text = order.pizza;
    let size_text = order.size;
    let comments_text = order.comments;
    let ing_text = order.ing
      .map(function () {
        return $(this)
          .val()
          .slice(4)
          .replace("-", " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
      })
      .toArray()
      .join(", ");
    text += `<li>Pizza: ${pizza_text} <br>Size: ${size_text} <br>Extra Ingedients: ${ing_text} <br>Comments: ${comments_text}</li>`;
  });
  text += "</ol>";
  let disp = $(
    `<div><div><p>Your order has been placed. Your order summary is:</p>${text}<p>Thanks for trying this order form.</p></div></div>`
  );
  disp.prop("id", "checkout_msg");
  disp.appendTo($("body"));
}

function add_order(object) {
  num++;
  $("#cart-num").text(num);

  let order = {
    pizza: $("[name='pizza-type']:checked").val(),
    size: $("#size option:selected").val(),
    ing: $("[name='ingredient']:checked"),
    comments: $("#comments").val(),
  };

  order.pizza = order.pizza
    .replace(/[-_]/g, " ")
    .replace(/\b[^p]/g, (c) => c.toUpperCase())
    .replace("pizza ", "");
  order.size = order.size.replace(/^\w/, (c) => c.toUpperCase());
  order.comments = order.comments.replace(/^\w/, (c) => c.toUpperCase());
  for (let i = 0; i < order.ing; i++) {
    order.ing[i] = order.ing[i].val();
  }

  $("#order-form").get(0).reset();

  $("[type='checkbox']:checked").each(function () {
    order.ing.push($(this).val());
  });

  $("#pizza-added > span").text(
    `Your pizza ${order.pizza} has been added to your order.`
  );

  $("#pizza-added").css("display", "block");
  totalOrder.push(order);
  $("body").hide();
  window.location.href = "#";
  setTimeout(() => $("body").show(), 150);
}

$("#submit").on("click", function (e) {
  e.preventDefault();
  add_order();
  window.location.href = "#";
});

$("#checkout").on("click", function (e) {
  e.preventDefault();

  add_order();

  checkout_msg();
});
