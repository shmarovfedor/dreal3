(set-logic QF_NRA)
(declare-fun x_0 () Real)
(declare-fun x_1 () Real)
(declare-fun x_2 () Real)
(declare-fun x_3 () Real)
(declare-fun x_4 () Real)
(declare-fun x_5 () Real)
(declare-fun x_6 () Real)
(declare-fun x_7 () Real)
(declare-fun x_8 () Real)
(declare-fun x_9 () Real)
(declare-fun x_10 () Real)
(declare-fun x_11 () Real)
(declare-fun x_12 () Real)
(declare-fun x_13 () Real)
(declare-fun x_14 () Real)
(declare-fun x_15 () Real)
(declare-fun x_16 () Real)
(declare-fun x_17 () Real)
(declare-fun x_18 () Real)
(declare-fun x_19 () Real)
(declare-fun x_20 () Real)
(declare-fun x_21 () Real)
(declare-fun x_22 () Real)
(declare-fun x_23 () Real)
(declare-fun x_24 () Real)
(declare-fun x_25 () Real)
(declare-fun x_26 () Real)
(declare-fun x_27 () Real)
(declare-fun x_28 () Real)
(declare-fun x_29 () Real)
(declare-fun x_30 () Real)
(declare-fun x_31 () Real)
(declare-fun x_32 () Real)
(declare-fun x_33 () Real)
(declare-fun x_34 () Real)
(declare-fun x_35 () Real)
(declare-fun x_36 () Real)
(declare-fun x_37 () Real)
(declare-fun x_38 () Real)
(declare-fun x_39 () Real)
(declare-fun x_40 () Real)
(declare-fun x_41 () Real)
(declare-fun x_42 () Real)
(declare-fun x_43 () Real)
(declare-fun x_44 () Real)
(declare-fun x_45 () Real)
(declare-fun x_46 () Real)
(declare-fun x_47 () Real)
(declare-fun x_48 () Real)
(declare-fun x_49 () Real)
(declare-fun x_50 () Real)
(declare-fun x_51 () Real)
(declare-fun x_52 () Real)
(declare-fun x_53 () Real)
(declare-fun x_54 () Real)
(declare-fun x_55 () Real)
(declare-fun x_56 () Real)
(declare-fun x_57 () Real)
(declare-fun x_58 () Real)
(declare-fun x_59 () Real)
(declare-fun x_60 () Real)
(declare-fun x_61 () Real)
(declare-fun x_62 () Real)
(declare-fun x_63 () Real)
(declare-fun x_64 () Real)
(declare-fun x_65 () Real)
(declare-fun x_66 () Real)
(declare-fun x_67 () Real)
(declare-fun x_68 () Real)
(declare-fun x_69 () Real)
(declare-fun x_70 () Real)
(declare-fun x_71 () Real)
(declare-fun x_72 () Real)
(declare-fun x_73 () Real)
(declare-fun x_74 () Real)
(declare-fun x_75 () Real)


(assert (= x_0 0))
(assert (= x_8 (+ x_2 x_1)))
(assert (= x_11 (/ x_3 x_4)))
(assert (not (<= x_8 x_11)))
(assert (= x_14 (^ x_1 0.5)))
(assert (= x_17 (/ x_3 x_2)))
(assert (not (<= x_14 x_17)))
(assert (= x_21 (* x_2 x_1)))
(assert (= x_22 (log x_21)))
(assert (= x_25 (+ x_4 x_5)))
(assert (= x_27 (+ x_3 x_25)))
(assert (= x_28 (log x_27)))
(assert (not (<= x_22 x_28)))
(assert (= x_31 (* 2 x_3)))
(assert (= x_33 (* 3 x_4)))
(assert (= x_34 (+ x_33 x_31)))
(assert (= x_36 (* 7 x_1)))
(assert (= x_37 (+ x_36 x_34)))
(assert (= x_39 (^ x_2 6)))
(assert (not (<= x_39 x_37)))
(assert (= x_43 (+ x_4 x_3)))
(assert (= x_46 (+ x_2 x_1)))
(assert (not (<= x_43 x_46)))
(assert (= x_51 (/ x_1 x_2)))

(check-sat)
(exit)
