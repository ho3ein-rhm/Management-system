const Yup = require("yup");

exports.schema = Yup.object().shape({
  fullname: Yup.string()
    .required("نام و نام خانوادگی الزامی می باشد")
    .min(3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد")
    .max(255, "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
  Address: Yup.string()
    .required("آدرس الزامی می باشد")
    .min(4, "آدرس نباید کمتر از 4 کاراکتر باشد")
    .max(255, "آدرس نباید بیشتر از 255 کاراکتر باشد"),
  phoneNumber: Yup.number()
    .positive()
    .integer()
    .min(11, "شماره تلفن باید 11 رقم باشد"),
});
