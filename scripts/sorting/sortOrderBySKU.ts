import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";
import { getAllProducts } from "../../functions/products/getAllProducts";

async function sortOrderBySKU() {
  try {
    const data = [
      { sku: "500", sort_order: 415 },
      { sku: "1000604", sort_order: 416 },
      { sku: "1000605", sort_order: 417 },
      { sku: "1000606", sort_order: 418 },
      { sku: "1000651", sort_order: 419 },
      { sku: "509", sort_order: 420 },
      { sku: "1000608", sort_order: 421 },
      { sku: "1000609", sort_order: 422 },
      { sku: "1000566", sort_order: 423 },
      { sku: "738", sort_order: 424 },
      { sku: "739", sort_order: 425 },
      { sku: "536", sort_order: 426 },
      { sku: "1000623", sort_order: 427 },
      { sku: "1000624", sort_order: 428 },
      { sku: "1000625", sort_order: 429 },
      { sku: "1000776", sort_order: 430 },
      { sku: "3010", sort_order: 431 },
      { sku: "1000694", sort_order: 432 },
      { sku: "1000696", sort_order: 433 },
      { sku: "510BL", sort_order: 434 },
      { sku: "509BL", sort_order: 435 },
      { sku: "1000632", sort_order: 436 },
      { sku: "1000799", sort_order: 437 },
      { sku: "533", sort_order: 438 },
      { sku: "SP001", sort_order: 439 },
      { sku: "2025", sort_order: 440 },
      { sku: "GL599", sort_order: 441 },
      { sku: "GL 598", sort_order: 442 },
      { sku: "521", sort_order: 443 },
      { sku: "1000602", sort_order: 444 },
      { sku: "1000695", sort_order: 445 },
      { sku: "1000698", sort_order: 446 },
      { sku: "1000631", sort_order: 447 },
      { sku: "552", sort_order: 448 },
      { sku: "1000600", sort_order: 449 },
      { sku: "1000697", sort_order: 450 },
      { sku: "1000630", sort_order: 451 },
      { sku: "559", sort_order: 452 },
      { sku: "563", sort_order: 453 },
      { sku: "553", sort_order: 454 },
      { sku: "3012", sort_order: 455 },
      { sku: "1000778", sort_order: 456 },
      { sku: "1000787", sort_order: 457 },
      { sku: "1000601", sort_order: 458 },
      { sku: "2021", sort_order: 459 },
      { sku: "3017", sort_order: 460 },
      { sku: "1000613", sort_order: 461 },
      { sku: "1000855", sort_order: 462 },
      { sku: "3014", sort_order: 463 },
      { sku: "1000788", sort_order: 464 },
      { sku: "2023", sort_order: 465 },
      { sku: "1000789", sort_order: 466 },
      { sku: "2027", sort_order: 467 },
      { sku: "520", sort_order: 468 },
      { sku: "1000791", sort_order: 469 },
      { sku: "1000790", sort_order: 470 },
      { sku: "527", sort_order: 471 },
      { sku: "1000794", sort_order: 472 },
      { sku: "1000792", sort_order: 473 },
      { sku: "2016", sort_order: 474 },
      { sku: "2022", sort_order: 475 },
      { sku: "575", sort_order: 476 },
      { sku: "2019", sort_order: 477 },
      { sku: "2024", sort_order: 478 },
      { sku: "2026", sort_order: 479 },
      { sku: "3016", sort_order: 480 },
      { sku: "2020", sort_order: 481 },
      { sku: "2017", sort_order: 482 },
      { sku: "550", sort_order: 483 },
      { sku: "1000233", sort_order: 484 },
      { sku: "1000796", sort_order: 485 },
      { sku: "522", sort_order: 486 },
      { sku: "D027", sort_order: 487 },
      { sku: "D034", sort_order: 488 },
      { sku: "D033", sort_order: 489 },
      { sku: "D032", sort_order: 490 },
      { sku: "D028", sort_order: 491 },
      { sku: "D029", sort_order: 492 },
      { sku: "D026", sort_order: 493 },
      { sku: "D030", sort_order: 494 },
      { sku: "1000650", sort_order: 495 },
      { sku: "1000685", sort_order: 496 },
      { sku: "1106", sort_order: 497 },
      { sku: "1000682", sort_order: 498 },
      { sku: "1000689", sort_order: 499 },
      { sku: "1000655", sort_order: 500 },
      { sku: "1100", sort_order: 501 },
      { sku: "1000684", sort_order: 502 },
      { sku: "1000681", sort_order: 503 },
      { sku: "1103", sort_order: 504 },
      { sku: "1000688", sort_order: 505 },
      { sku: "1000680", sort_order: 506 },
      { sku: "1104", sort_order: 507 },
      { sku: "1104A", sort_order: 508 },
      { sku: "1107", sort_order: 509 },
      { sku: "1102", sort_order: 510 },
      { sku: "1101", sort_order: 511 },
      { sku: "1000686", sort_order: 512 },
      { sku: "1000662", sort_order: 513 },
      { sku: "1000576", sort_order: 514 },
      { sku: "1000578", sort_order: 515 },
      { sku: "1000575", sort_order: 516 },
      { sku: "1000575A", sort_order: 517 },
      { sku: "1000574", sort_order: 518 },
      { sku: "1000577", sort_order: 519 },
      { sku: "1000573", sort_order: 520 },
      { sku: "1000586", sort_order: 521 },
      { sku: "1000589", sort_order: 522 },
      { sku: "1000579", sort_order: 523 },
      { sku: "1000767", sort_order: 524 },
      { sku: "1000772", sort_order: 525 },
      { sku: "1000771", sort_order: 526 },
      { sku: "1000768", sort_order: 527 },
      { sku: "1000774", sort_order: 528 },
      { sku: "1000775", sort_order: 529 },
      { sku: "1082", sort_order: 530 },
      { sku: "1000612", sort_order: 531 },
      { sku: "1000769", sort_order: 532 },
      { sku: "1000616", sort_order: 533 },
      { sku: "1000773", sort_order: 534 },
      { sku: "1152", sort_order: 535 },
      { sku: "1151", sort_order: 536 },
      { sku: "1000770", sort_order: 537 },
      { sku: "1000763", sort_order: 538 },
      { sku: "1000761", sort_order: 539 },
      { sku: "1000762", sort_order: 540 },
      { sku: "1000764", sort_order: 541 },
      { sku: "1000657", sort_order: 542 },
      { sku: "1000654", sort_order: 543 },
      { sku: "564", sort_order: 544 },
      { sku: "565", sort_order: 545 },
      { sku: "1000659", sort_order: 546 },
      { sku: "538", sort_order: 547 },
      { sku: "586", sort_order: 548 },
      { sku: "570", sort_order: 549 },
      { sku: "1069", sort_order: 550 },
      { sku: "576", sort_order: 551 },
      { sku: "882", sort_order: 552 },
      { sku: "1000656", sort_order: 553 },
      { sku: "585", sort_order: 554 },
      { sku: "1000620", sort_order: 555 },
      { sku: "1000620A", sort_order: 556 },
      { sku: "1000621", sort_order: 557 },
      { sku: "303T", sort_order: 558 },
    ];

    require("../../config/config").config("ch");
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const { sku, sort_order } = data[i];
      let product = await getProductBySku(sku);
      if (!product) {
        let products = await getAllProducts({ sku });
        if (products.length < 1) {
          console.log("not product", sku);
          continue;
        }
        if (products.length > 1) {
          throw `to many products for sku ${sku}`;
        }
        product = products[0];
      }
      await updateProduct(product.id, { sort_order });
      await new Promise(function (resolve) {
        setTimeout(resolve, 1000);
      });
    }
  } catch (err: any) {
    console.log(err.response.data ?? err.response ?? err);
  }
}
sortOrderBySKU();
