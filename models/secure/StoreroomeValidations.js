const Yup = require("yup");

exports.schema = Yup.object().shape({
  phoneNumber: Yup.number()
    .required("شماره تلفن الزامی می باشد")
    .min(10, "شماره تلفن نباید کمتر از 11 رقم باشد"),
  adress: Yup.string().required("آدرس الزامی میباشد"),
  name: Yup.string().required("نام انبار الزامی میباشد"),
});
