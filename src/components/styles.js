import styled from '@emotion/styled';
import { TextField, Button } from 'nexus-module';

export const PageLayout = styled.div`
  display: grid;
  grid-template-rows: auto;
  gap: 16px;
  padding: 8px 0;
`;

export const SingleColRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 10px;
  overflow: auto;
  width: 98%;
  margin: 0 auto;
`;

export const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const SearchRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const UrlField = styled(TextField)({
  flex: 1,
});

export const SmallField = styled(TextField)({
  flex: 1,
});

export const VerificationResult = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 12px auto 0;
  border: 1px solid ${({ verified }) => (verified ? '#4caf50' : '#ff9800')};
  border-radius: 6px;
  padding: 16px;
  background: ${({ verified }) =>
    verified ? 'rgba(76, 175, 80, 0.08)' : 'rgba(255, 152, 0, 0.08)'};
`;

export const ResultHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ verified }) => (verified ? '#4caf50' : '#ff9800')};
`;

export const ResultField = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 0;
  font-size: 13px;
  word-break: break-all;
`;

export const FieldLabel = styled.span`
  font-weight: 600;
  min-width: 100px;
  flex-shrink: 0;
`;

export const FieldValue = styled.span`
  opacity: 0.9;
`;

export const AssetCard = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 14px;
  cursor: pointer;
  transition: border-color 0.15s;
  &:hover {
    border-color: rgba(255, 255, 255, 0.35);
  }
`;

export const AssetTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
`;

export const AssetMeta = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const FormLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
`;

export const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const StatusMessage = styled.div`
  text-align: center;
  padding: 20px;
  opacity: 0.6;
  font-size: 14px;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 30px 16px;
  opacity: 0.5;
  font-size: 14px;
  max-width: 600px;
  margin: 0 auto;
`;