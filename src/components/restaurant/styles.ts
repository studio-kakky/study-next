import css from 'styled-jsx/css';

export const styles = css`
  .RestaurantListItem {
    width: 100%;
    border: 1px solid #ccc;
    border-top: 3px solid #ccc;
    margin-bottom: 10px;
    &_Header {
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #fcdce4;
      &_Checkbox {
        margin-right: 10px;
      }
    }

    &_Body {
      padding: 20px;
      box-sizing: border-box;
    }
  }

  .Restaurant {
    &Thumbnail {
      margin-bottom: 20px;
      text-align: center;
      &_img {
        max-height: 400px;
        max-width: 100%;
      }
    }

    &InfoTable {
      border-collapse: collapse;
      width: 100%;
      &_Row {
        border-bottom: 1px solid #ccc;
        &:first-child {
          border-top: 1px solid #ccc;
        }
      }
      &_head {
        background: #ddd;
      }
    }
  }
`;
